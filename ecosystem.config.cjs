module.exports = {
  apps: [
    {
      name: "sitebr2oa2zg",
      script: "npm",
      args: "run start -- --hostname 127.0.0.1 --port 3413",
      cwd: "/mnt/data/kalp-business-api/.business-sites/k-h-food",
      env: {
        NODE_ENV: "production",
        "NEXT_TELEMETRY_DISABLED": "1","NEXT_PUBLIC_API_BASE_URL": "http://127.0.0.1:8010","NEXT_PUBLIC_TENANT_ID": "kp_k_h_food","KALP_BUSINESS_API_URL": "http://127.0.0.1:8010","KALP_TENANT_DB": "kp_k_h_food","KALP_TENANT_SLUG": "k-h-food","NEXT_PUBLIC_KALP_CHECKOUT_ENABLED": "false"
      }
    }
  ]
};
