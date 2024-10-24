import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { error } from "node_modules/astro/dist/core/logger/core";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
        path: "/", // valida en todos los paths
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      const user = userCredential.user;

      // Devolver un objeto serializable
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong");
    }
  },
});