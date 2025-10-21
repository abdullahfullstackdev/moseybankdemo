import "server-only";
import { createClient, AuthMode } from "@remkoj/optimizely-graph-client";
import { getContentById } from "@gql/functions";
import { setupFactory } from "@components/factory";
import { createEditPageComponent } from "@remkoj/optimizely-cms-nextjs/preview";


export default createEditPageComponent(setupFactory(), {
  loader: getContentById,
  clientFactory: (token?: string) => {
    const client = createClient(undefined, token, {
      nextJsFetchDirectives: true,
      cache: false,
      queryCache: false,
    });
    if (token) {
      client.updateAuthentication(AuthMode.HMAC);
      client.enablePreview();
    }
    return client;
  },
  refreshTimeout: 500,
});

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "nodejs";