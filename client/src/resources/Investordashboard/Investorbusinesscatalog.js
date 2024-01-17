import React from 'react'
import Sidebar from './components/Sidebar'
import { Center, HStack, Input, Text } from "@chakra-ui/react";

const Investorbusinesscatalog = () => {
  return (
    <>
    {/* onChange={(event) => { handleInputChange(event, setSearch); searchCourse(); }} */}
    <Sidebar>
        <Center>
            <HStack width={'50%'}>
                <Input variant='outline' placeholder='Search Courses'  />
            </HStack>
        </Center>
        <HStack flexWrap={'wrap'} >

            {/* {courses.map(course => {
            
                return <Course course={course} />
            })} */}

        </HStack>
      </Sidebar>
    </>
  )
}

export default Investorbusinesscatalog