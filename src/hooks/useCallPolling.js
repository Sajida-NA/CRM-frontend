import { useEffect, useRef } from "react";
import api from "../services/api";

const TERMINAL_STATUSES = [
  "completed",
  "busy",
  "no-answer",
  "failed",
  "canceled",
];

export default function useCallPolling(calls, setCalls) {
  const timersRef = useRef({});

  useEffect(() => {
    if (!Array.isArray(calls)) {
      return;
    }

    calls.forEach((call) => {
      if (!call?.id || !call?.twilio_call_sid) {
        return;
      }

      const currentStatus = call?.twilio_status;

      // Already finished
      if (TERMINAL_STATUSES.includes(currentStatus)) {
        if (timersRef.current[call.id]) {
          clearInterval(timersRef.current[call.id]);
          delete timersRef.current[call.id];
        }

        return;
      }

      // Prevent duplicate polling
      if (timersRef.current[call.id]) {
        return;
      }

      // Poll every 3 seconds
      timersRef.current[call.id] = setInterval(async () => {
        try {
          const response = await api.get(
            `/activities/call/${call.id}/sync/`
          );

          const updatedCall = response.data?.call;

          if (!updatedCall) {
            return;
          }

          setCalls((previousCalls) =>
            previousCalls.map((existingCall) =>
              existingCall.id === updatedCall.id
                ? updatedCall
                : existingCall
            )
          );

          // Stop polling after call finishes
          if (
            response.data?.is_terminal ||
            TERMINAL_STATUSES.includes(
              response.data?.twilio_status
            )
          ) {
            clearInterval(timersRef.current[call.id]);

            delete timersRef.current[call.id];
          }
        } catch (error) {
          console.error(
            `CALL ${call.id} SYNC ERROR:`,
            error.response?.data || error.message
          );
        }
      }, 3000);
    });

    return () => {
      Object.values(timersRef.current).forEach(
        (timer) => clearInterval(timer)
      );

      timersRef.current = {};
    };
  }, [calls, setCalls]);
}