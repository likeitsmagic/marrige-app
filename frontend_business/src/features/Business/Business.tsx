import { Flex, Skeleton } from "@gravity-ui/uikit";
import { BusinessActionBar } from "./components/BusinessActionBar/BusinessActionBar";
import { useBusiness } from "./hooks/useBusiness";

export const Business = () => {
  const {  isLoading } = useBusiness()

  if (isLoading) return <Flex height="100vh" width="100%"  direction="column" gap={4}>
  <Skeleton qa="page" style={{height: 200, width: "100%"}}/>
  <Skeleton qa="page" style={{height: 200, width: "100%"}}/>
  <Skeleton qa="page" style={{height: 200, width: "100%"}}/>
</Flex>;

  return <>
  				<BusinessActionBar />
          </>
};
  