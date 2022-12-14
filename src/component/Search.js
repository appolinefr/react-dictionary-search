import React, { useState } from "react";
import axios from "axios";

import { Box, Container, Text, Input } from "@chakra-ui/react";

import Result from "./Result";
import Photos from "./Photos";

export default function Search(props) {
  const [word, setWord] = useState(props.defaultWord);
  const [definition, setDefinition] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState(null);

  const search = (e) => {
    e.preventDefault();
    dictionarySearch();
  };

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handlePexelResponse = (response) => {
    setPhotos(response.data.photos);
  };

  const handleResponse = (response) => {
    setDefinition(response.data[0]);
    setLoaded(true);
  };

  const dictionarySearch = () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    axios.get(url).then(handleResponse);

    const pexelApiKey =
      "563492ad6f91700001000001fddcea100ece4eb682d6b169ae513ef8";
    const pexelUrl = `https://api.pexels.com/v1/search?query=${word}
`;

    const headers = { Authorization: `Bearer ${pexelApiKey}` };
    axios.get(pexelUrl, { headers }).then(handlePexelResponse);
  };

  if (loaded) {
    return (
      <Box as={Container} maxW="full" p={4} backgroundColor={"gray.50"}>
        <Box
          as={Container}
          maxW="3xl"
          p={6}
          borderWidth={1}
          my={8}
          backgroundColor={"gray.500"}
          borderRadius={8}
          textAlign={"center"}
        >
          <Text fontSize={"lg"} fontWeight={600} color={"white"}>
            What word would you like to search?
          </Text>

          <form onSubmit={search} p={6}>
            <Input
              type="search"
              placeholder="Search for a word..."
              margin={2}
              maxWidth={"700px"}
              onChange={handleWordChange}
              focusBorderColor={"white"}
              backgroundColor={"white"}
            />
          </form>
        </Box>
        <Result data={definition} />
        <Photos photos={photos} />
      </Box>
    );
  } else {
    return dictionarySearch();
  }
}
