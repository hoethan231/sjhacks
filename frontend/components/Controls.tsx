"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
export default function Controls() {
  const { connect, disconnect, readyState, messages } = useVoice();

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button
        onClick={() => {
          disconnect();
          console.log(messages);
        }}
      >
        End Session
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        connect()
          .then(() => {
            console.log("ok");
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      Start Session
    </button>
  );
}