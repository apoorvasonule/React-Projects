import { Flex, Stack, Heading, Box, Text } from "@chakra-ui/layout";
import { Button, Image, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";


const App = () => {

  const [gameStarted, setGameStarted] = useState(false);

  const numbers = [1,2,3,4,5,6];

  const [selectedNumber,setSelectedNumber] = useState();

  const [dice, setDice] = useState(1);
 
  const [error, setError] = useState(null);
  
  const [score, setScore] = useState(0);


  const startGameHandler = () => {
    setGameStarted(true)
  };

  const onNumberClicked = (value) =>{
    setSelectedNumber(value);
    setError(null);
  };

  const genRandomNo = () =>{
    if(selectedNumber){
      const generatedNo = Math.ceil(Math.random() * 6);
    setDice(generatedNo);
    
    if(selectedNumber === generatedNo){
      setScore((prev) => prev + generatedNo);
    }
    else{
      setScore((prev) => prev - 2);
    }
      
    }else{
      setError("Please select number");
    }
  };



  return (<>
      {gameStarted ? <>
        <Stack justify={"center"} align={"center"} mx={"auto"}>
        <Heading as="h1" fontSize={"5xl"} mb={"4"} color={error? "red" : "black"}>{error? error : "Select Number"}</Heading>
        <Flex pb={"8"}>
        {numbers.map((value)=>
        <Flex justify={"center"} align="center" height={"50px"} w={"50px"} bg={selectedNumber === value ? "green" : "black"} color={"white"} fontSize="2xl" key={value} margin={"4"} borderRadius={"md"} onClick={()=> onNumberClicked(value)}>{value}</Flex>
        )}</Flex>
        <Box h={"150px"} w={"150px"} marginTop={"-2"} onClick={genRandomNo}>
        <Image src={`/images/dice/dice_${dice}.png`} ></Image>
        </Box>

        <Text as="p" fontSize={"xl"}>Click on dice to roll</Text>
        <Text fontSize={"7xl"} fontWeight="bold" color={score>0 ? "green" : "red"}>{score}</Text>
        <Text fontSize={"4xl"} fontWeight={"bold"}>Total Score</Text>
        <Button onClick={() => setScore(0)}>Reset Score</Button>
      </Stack>

      <Stack maxW={"900px"} mx={"auto"}>
        <Heading as={"h2"}>Game Rules</Heading>
        <List>
          <ListItem>Select any number</ListItem>
          <ListItem>Click on dice image to roll</ListItem>
          <ListItem>If selected number is equal to obtained dice result then you will get same point of dice </ListItem>
          <ListItem>If selected number is NOT equal to obtained dice result then your score will be deducted by 2 points</ListItem>
        </List>
      </Stack>
      </> : <Flex justifyContent="center" align="center">
      <Image width="40%" 
      marginTop="100px"
      src="/dices.png" />
      <Stack>
        <Heading fontSize="7xl" as="h1">The Dice Game</Heading>
        <Button alignSelf="flex-end" backgroundColor="black" color="white" _hover={{bg:'grey'}}
        onClick={startGameHandler}>Start Game</Button>
      </Stack>
    </Flex>}
  </>);
};

export default App;