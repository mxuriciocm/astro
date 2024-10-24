import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async (input, context) => {
    // Cookies
    if (input.remember_me) {
      context.cookies.set("email", input.email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
        path: "/", // valida en todos los paths
      });
    } else {
      context.cookies.delete("email", {
        path: "/",
      });
    }

    // Creacion de usuario

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebase.auth,
        input.email,
        input.password
      );

      const user = userCredential.user;

      // Extraer solo los datos necesarios y serializables
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };

      // Actualizar el nombre (displayName)


      updateProfile(firebase.auth.currentUser!, {
        displayName: input.name,
      })

      // Verificar el correo electronico
      await sendEmailVerification(firebase.auth.currentUser!, {
        url: 'http://localhost:4321/protected?emailVerified=true'
      })

      return userData;
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong");
    }

    return { ok: true, msg: "User created" };
  },
});
