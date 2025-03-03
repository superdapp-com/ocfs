import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RPC_HTTP_1: z.string(),
    RPC_HTTP_137: z.string(),
    RPC_HTTP_369: z.string(),
    RPC_HTTP_8453: z.string(),
    RPC_HTTP_101: z.string(),
    RPC_HTTP_17000: z.string(),
    RPC_HTTP_11155111: z.string(),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    RPC_HTTP_1: process.env.RPC_HTTP_1,
    RPC_HTTP_137: process.env.RPC_HTTP_137,
    RPC_HTTP_369: process.env.RPC_HTTP_369,
    RPC_HTTP_8453: process.env.RPC_HTTP_8453,
    RPC_HTTP_101: process.env.RPC_HTTP_101,
    RPC_HTTP_17000: process.env.RPC_HTTP_17000,
    RPC_HTTP_11155111: process.env.RPC_HTTP_11155111,
  },
});