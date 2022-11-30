import React, { useState } from "react";
import axios from "axios";

import { Box, Container, Text, Heading, Input } from "@chakra-ui/react";

import Result from "./Result";

export default function Search(props) {
  const [word, setWord] = useState(props.defaultWord);
  const [definition, setDefinition] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const search = (e) => {
    e.preventDefault();
    dictionarySearch();
  };

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handleResponse = (response) => {
    console.log(response.data[0]);
    setDefinition(response.data[0]);
    setLoaded(true);
  };

  const dictionarySearch = () => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    axios.get(url).then(handleResponse);
  };

  if (loaded) {
    return (
      <Box as={Container} maxW="full" p={4} backgroundColor={"#"}>
        <Heading my={8} textAlign={"center"} color={"#"}>
          React Dictionary
        </Heading>
        <Box
          as={Container}
          maxW="4xl"
          p={6}
          backgroundColor={"white"}
          borderRadius={8}
          textAlign={"center"}
        >
          <Text fontSize={"lg"} p={2} fontWeight={600}>
            What word would you like to search?
          </Text>
          <form onSubmit={search} p={6}>
            <Input
              type="search"
              placeholder="Search for a word..."
              margin={2}
              maxWidth={"700px"}
              onChange={handleWordChange}
            />
          </form>
        </Box>
        <Box as={Container} maxW="full" p={6}>
          <Result data={definition} />
        </Box>
      </Box>
    );
  } else {
    return dictionarySearch();
  }
}
