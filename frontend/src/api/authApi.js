const API = "http://localhost:4000/api";

export const loginAdminRequest = async (email, password) => {

  const response = await fetch(`${API}/loginAdmin`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    // necesario para que el navegador guarde la cookie 'authCookie'
    credentials: "include",

    body: JSON.stringify({ email, password })

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Credenciales incorrectas.");
  }

  return data;
};

export const registerAdminRequest = async (data) => {

  const response = await fetch(`${API}/registerAdmin`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    // necesario para que el navegador guarde la cookie 'registrationCookie'
    credentials: "include",

    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    })

  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "No se pudo completar el registro.");
  }

  return result;
};

export const verifyCodeAdminRequest = async (code) => {

  const response = await fetch(`${API}/registerAdmin/verifyCodeEmail`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    // necesario para que el navegador envíe la cookie 'registrationCookie'
    credentials: "include",

    body: JSON.stringify({ code })

  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "El código ingresado es incorrecto.");
  }

  return result;
};

export const recoveryAdminRequest = async (email) => {

  const response = await fetch(`${API}/recoveryPasswordAdmin`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    // necesario para que el navegador guarde la cookie 'recoveryCookie'
    credentials: "include",

    body: JSON.stringify({ email })

  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "No se pudo enviar el código de recuperación.");
  }

  return result;
};

export const recoveryVerifyCodeAdminRequest = async (code) => {

  const response = await fetch(`${API}/recoveryPasswordAdmin/verifyCode`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    // necesario para que el navegador envíe la cookie 'recoveryCookie'
    credentials: "include",

    body: JSON.stringify({ code })

  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "El código ingresado es incorrecto.");
  }

  return result;
};

export const newPasswordAdminRequest = async (newPassword, confirmPassword) => {

  const response = await fetch(`${API}/recoveryPasswordAdmin/newPassword`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    // necesario para que el navegador envíe la cookie 'recoveryCookie'
    credentials: "include",

    body: JSON.stringify({ newPassword, confirmPassword })

  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "No se pudo actualizar la contraseña.");
  }

  return result;
};