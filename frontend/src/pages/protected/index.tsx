import { FC, useEffect, useState } from "react";
import axiosInstance from "../../app/api/axios.ts";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export const Protected: FC = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<Array<never>>([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get<Array<never>>('/users')


        if (res.data) {
          setUsers(res.data)
        }
      } catch (e) {
        if (isAxiosError(e)) {
          console.log(e);
          if (e.response?.status === 401) {
            navigate('/')
          }
        }
      }
    }

    getUsers()
  }, [navigate]);

  return <Box>
    {JSON.stringify(users)}
  </Box>
};