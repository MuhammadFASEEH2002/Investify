import React, { useEffect, useState } from "react";
import {
  Table, Thead, TableContainer, Th, Tr, Tbody, Td, Tfoot, HStack,
  Stack, InputGroup, Select, InputRightElement, Input, Text, Button
} from "@chakra-ui/react"
import { IoMdSearch } from "react-icons/io";
import { GrNext, GrPrevious } from "react-icons/gr";




export default function JTable(props) {

  const [filteredRows, setFilteredRows] = useState(props.tableData)

  const length = props.tableData.length

  const [search, SetSearch] = useState('')

  const [displayPage, setDisplayPage] = useState('1 to 10')

  const [showCount, setShowCount] = useState(10)

  const [page, setPage] = useState(1)

  useEffect(() => {
    handleSearch()
  }, [search])

  useEffect(() => {

    console.log(DisplayRowsByPageCount(props.tableData))
    setFilteredRows(DisplayRowsByPageCount(props.tableData))

  }, [page, showCount])

  const handleSearch = () => {
    if (search.length > 2) {
      let filtered = props.tableData.filter(row => {
        return Object.values(row).some(value => {     //row.tableHead/title
          return value.toString().toLowerCase().includes(search.toLowerCase())
        })
      })
      setFilteredRows(filtered)
    } else {
      setFilteredRows(DisplayRowsByPageCount(props.tableData))
    }
  }


  const DisplayRowsByPageCount = (array) => {

    const totalDisplayRows = page * showCount;
    const startIndex = (page - 1) * showCount;
    const endIndex = totalDisplayRows > array.length ? array.length : totalDisplayRows;
    if (endIndex > array.length) {
      return array.slice(startIndex, array.length);
    }
      
    setDisplayPage(`${startIndex} to ${endIndex}`)
    return array.slice(startIndex, endIndex);
  }

  const OnNext  = () =>{
    if (page < Math.ceil(length / showCount)) {
      setPage(page + 1)
    }
  }

  const OnPrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <TableContainer bg={props.bg} p={2} >
      <HStack m={4} justifyContent={'space-between'}>
        <Stack>
          <Select size='sm' onChange={(e) => setShowCount(Number(e.target.value))}  >
            <option value='10' >10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
          </Select>
        </Stack>

        <Stack>
          <InputGroup>
            <Input placeholder='Search...' value={search} onChange={(e) => SetSearch(e.target.value)} />
            <InputRightElement>
              <IoMdSearch size={22} />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </HStack>
      <Table size={props.size}>
        <Thead>
          <Tr>
            {props.tableHeads.map(head => (
              <Th key={head}>{head}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredRows.map((row, index) => (
            <React.Fragment key={index}>
              {props.tableRender(index, row)}
            </React.Fragment>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {props.tableHeads.map(head => (
              <Th key={head}>{head}</Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
      <HStack justify={'space-between'} mt={2} >
        <Text> Showing {displayPage} of {length} </Text>
        <HStack>
          <Button size={'sm'} leftIcon={<GrPrevious />} colorScheme='gray' variant='outline' onClick={OnPrevious} >
            Prev
          </Button>
          <Text>Page {page}</Text>
          <Button size={'sm'} leftIcon={<GrNext />} colorScheme='gray' variant='outline' onClick={OnNext} >
            Next
          </Button>
        </HStack>
      </HStack>
    </TableContainer>
  )
}