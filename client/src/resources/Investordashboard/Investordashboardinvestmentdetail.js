import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardBody, Text, HStack, Stack, VStack, Heading, Divider, Spinner, Button, CardFooter, useToast } from '@chakra-ui/react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import useListing from "../../providers/listingStore";
import { FiDownload } from "react-icons/fi";

const Investordashboardinvestmentdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const setListing = useListing((state) => state?.setListing)
  const listing = useListing((state) => state?.listings)
  const [loading, setLoading] = useState(false)
  const [investorId, setInvestorId] = useState("");
  const toast = useToast()
  function getInvestment() {
    setLoading(true)
    const token1 = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-investment-detail`, {
      method: "GET",
      headers: {
        "id": id,
        'token': token1,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {

          setListing(res.listing)
          setInvestorId(res.investorId)
          setLoading(false)
        }
        else {
          toast({
            title: "Network Error",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)

      });
  }
  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Investment-Detail";
      getInvestment();
    } else {
      navigate("/user-login");
    }
  }, []);
  return (
    <>
      <Sidebar>
        {loading ? (<>
          <Stack alignItems={'center'} justifyContent={'center'}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Stack>
        </>) : (<>
          <Card alignItems={"center"} justifyContent={"center"}>
            <Stack width={{ base: "100%", md: "95%", lg: "95%" }} alignItems={"flex-start"} justifyContent={"center"} flexDirection={{ base: "column", md: "column", lg: "row" }}>
              <Stack width={{ base: "100%", md: "100%", lg: "60%" }}>
                <CardBody width={"100%"}>
                  < Heading fontSize={"2xl"} color={"blue.400"}>
                    Business Details
                  </Heading>
                  <Divider marginBottom={"10px"} />
                  <Stack fontSize={{ base: "10", md: "15", lg: "15" }}>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"} >
                      <Text color={"blue.400"}>Business Name: </Text>
                      <Text>{listing?.investee_id?.businessName}</Text>
                    </HStack>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Business Category: </Text>
                      <Text>{listing?.investee_id?.category}</Text>
                    </HStack>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Description: </Text>
                      <Text>{listing?.description}</Text>
                    </HStack>
                  </Stack>
                </CardBody>
              </Stack>
              <Stack width={{ base: "100%", md: "100%", lg: "35%" }}>
                <CardBody width={"100%"}>
                  < Heading fontSize={"2xl"} color={"blue.400"} >
                    Investee Information
                  </Heading>
                  <Divider marginBottom={"10px"} />
                  <Stack fontSize={{ base: "10", md: "15", lg: "15" }}>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Contact Number: </Text>
                      <Text>{listing?.investee_id?.phoneNumber}</Text>

                    </HStack>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Email: </Text>
                      <Text>{listing?.investee_id?.email}</Text>
                    </HStack>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Location: </Text>
                      <Text>{listing?.investee_id?.address}, {listing?.investee_id?.zipcode}, {listing?.investee_id?.city}, {listing?.investee_id?.country}</Text>
                    </HStack>
                  </Stack>
                  <Stack width={"100%"} justifyContent={"center"} alignItems={"center"} marginTop={"10px"}>
                  </Stack>
                </CardBody>
                <CardBody width={"100%"}>
                  < Heading fontSize={"2xl"} color={"blue.400"} >
                    Investor Information
                  </Heading>
                  <Divider marginBottom={"10px"} />
                  <Stack fontSize={{ base: "10", md: "15", lg: "15" }}>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Full Name: </Text>
                      <Text>{listing?.investor_id?.firstName} {listing?.investor_id?.lastName}</Text>
                    </HStack>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Email: </Text>
                      <Text>{listing?.investor_id?.email}</Text>
                    </HStack>
                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                      <Text color={"blue.400"}>Phone Number: </Text>
                      <Text>{listing?.investor_id?.phoneNumber}</Text>
                    </HStack>
                  </Stack>
                </CardBody>
              </Stack>
            </Stack>
            <Stack width={"100%"} justifyContent={"center"} alignItems={"center"} marginTop={"10px"}>
            </Stack>
            <CardFooter>
              <CardBody width={"100%"}>
                < Heading fontSize={"2xl"} color={"blue.400"} >
                  Investment Terms & Conditions
                </Heading>
                <Divider marginBottom={"10px"} />
                <Stack fontSize={{ base: "10", md: "15", lg: "15" }}>
                  <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Text color={"blue.400"}>Investment Amount: </Text>
                    <Text>Rs {listing?.amount}</Text>
                  </HStack>
                  <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Text color={"blue.400"}>Investment Amount Given after Commission: </Text>
                    <Text>Rs {listing?.amountReceived}</Text>
                  </HStack>
                  <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Text color={"blue.400"}>Duration of Investment: </Text>
                    <Text>{listing?.investmentDuration} years</Text>
                  </HStack>
                  <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Text color={"blue.400"}>Profit Share: </Text>
                    <Text>{listing?.profitPercentage}% of profit will be shared with the investor after investment period is completed.</Text>
                  </HStack>
                  <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Text color={"blue.400"}>Investment Agreement: </Text>
                    <Link to={`${listing?.agreementDocument}`} color='blue' >
                      <FiDownload color='blue' size={'20px'}/>
                    </Link>
                  </HStack>
                </Stack>

              </CardBody>
              <Stack width={{ base: "100%", md: "100%", lg: "40%" }}>
                {listing?.profit && (
                  <CardBody width={"100%"}>
                    <Heading fontSize={"2xl"} color={"blue.400"}>
                      Profit Return
                    </Heading>
                    <Divider marginBottom={"10px"} />
                    <Stack fontSize={{ base: "10", md: "15", lg: "15" }}>
                      <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                        <Text color={"blue.400"}>Profit Amount: </Text>
                        {/* <Text>Rs {listing?.profit?.profitAmount}</Text> */}
                        <Text>Rs {Number(listing?.profit.profitAmount).toLocaleString('en-IN')}</Text>

                      </HStack>


                      <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                        <Text color={"blue.400"}>Profit Return Proof: </Text>
                        <Link to={`${listing?.profit?.profitProof}`} color='blue' target='blank' >
                          <FiDownload color='blue' size={'20px'} />
                        </Link>
                      </HStack>
                    </Stack>
                  </CardBody>
                )}
              </Stack>
            </CardFooter>
          </Card>
        </>)}
      </Sidebar>
    </>
  )
}

export default Investordashboardinvestmentdetail