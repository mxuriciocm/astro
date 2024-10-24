import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export const loginGoogle = defineAction({
  accept: "json",
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    if (!credential) {
      throw new Error("Google SignIn failed");
    }
    await signInWithCredential(firebase.auth, credential!);

    return { ok: true };
  },
});
