import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

import RocketIcon from '@mui/icons-material/Rocket'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box, Divider, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"

import { PageTitle } from '../components/Layout'
import Shake from '../components/Shake'
import SlideDown from '../components/SlideDown'

const rocketListQuery = gql`
    {
      rockets {
        id
        name
        description
        stages
        active
      }
    }
  `

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -16
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

interface Rocket {
  id: string
  name: string
  description: string
  stages: number
  active: boolean
}
interface RocketListResponse {
  rockets: Rocket[]
}

interface RocketListProps {
  rockets: Rocket[]
}
const RocketList: React.FC<RocketListProps> = ({rockets}) => {
  const navigate = useNavigate()
  return (
      <List>
        {rockets.map((rocket, index, list) => (
          <motion.div key={rocket.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: index * 0.05
            }}
          >
            <ListItemButton
              onClick={() => navigate(`/${rocket.id}`)}
            >
              <ListItemAvatar><RocketIcon /></ListItemAvatar>
              <ListItemText
                primary={rocket.name}
                secondary={rocket.description}
              />
            </ListItemButton>
            {index < list.length-1 && <Divider/>}
          </motion.div>
        ))}
      </List>
  )
}

const Rockets: React.FC = () => {
  const {loading, error, data} = useQuery<RocketListResponse>(rocketListQuery, {
    fetchPolicy: 'cache-first'
  })
  return (
    <>
      <PageTitle>Rockets</PageTitle>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: loading || error || !data?.rockets?.length ? 'center' : 'start',
        minHeight: 'calc(100vh - 30px)'
      }}>
        {loading && (
          <Shake>
            <RocketLaunchIcon fontSize='large' />
          </Shake>
        )}
        {error && <Box color="error">Okay, Houston... we've had a problem here.</Box>}
        {data?.rockets && <RocketList rockets={data.rockets} />}
      </Box>
    </>
  )
}

export default Rockets