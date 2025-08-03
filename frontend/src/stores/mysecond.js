const API_BASE = import.meta.env.VITE_API_BASE

export async function apiRequest(method, url, body = null, options = {}) {
  // نکته: url می‌تونه کامل نباشه، پس به API_BASE وصل میشه
  const fullUrl = url.startsWith("http") ? url : API_BASE + url;
  const headers = {};

  // توکن اگر داشتی از localStorage بگیر
  const token = localStorage.getItem("token") || localStorage.getItem("access");
  if (token) headers["Authorization"] = "Bearer " + token;

  // برای درخواست‌هایی که body دارن و فایل نیستن
  const isSendingFile = body instanceof FormData;
  if (!isSendingFile) headers["Content-Type"] = "application/json";

  // اگر فایل داری (مثلاً عکس فاکتور)، body باید FormData باشه و Content-Type رو بالایی ست نکن!
  const fetchOptions = {
    method: method.toUpperCase(),
    headers,
    ...options,
  };

  if (body) {
    fetchOptions.body = isSendingFile ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);

    // اگر جواب JSON باشه
    const isJson = response.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      // خطای معنی‌دار ریترن کن
      throw new Error(data?.detail || data || "API Error");
    }
    return data;
  } catch (error) {
    // لاگ و پرتاب خطا برای هندل گرافیکی در vue
    console.error("apiRequest error:", error);
    throw error;
  }
}
