import { FormEvent, useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  // onSubmit function

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const userData = {
      name,
      username,
      email,
      photo,
      password,
    };

    axios
      .post("http://localhost:3000/users/", userData)
      .then(() => {
        toast({
          title: "Account created.",
          description: "User created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Account creation failed.",
          description: "Oops, something went wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        console.log("Promise completed");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Photo:
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button type="submit" colorScheme="blue">
        Create
      </Button>
    </form>
  );
};

export default CreateUser;
