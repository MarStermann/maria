import { HeadManager } from "@/components/head-manager";
import { Layout } from "@/components/layout";
import { matchRoute } from "@/routes";

type AppProps = {
  path?: string;
};

export function App({ path = "/" }: AppProps) {
  const route = matchRoute(path);

  return (
    <>
      <HeadManager meta={route.meta} />
      <Layout>{route.render()}</Layout>
    </>
  );
}
