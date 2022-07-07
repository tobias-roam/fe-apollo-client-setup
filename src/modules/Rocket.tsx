import React, { useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material"

import Shake from '../components/Shake'
import SlideDown from '../components/SlideDown'

const rocketQuery = gql`
    query getRocket($id: ID!) {
      rocket(id: $id) {
        id
        name
        stages
        active
        stages
        description
        first_flight
        wikipedia
        diameter {
          meters
        }
        height {
          meters
        }
      }
    }
  `

interface Rocket {
  id: string
  name: string
  description: string
  stages: number
  active: boolean
  wikipedia: string
  diameter: {
    meters: number
  }
  height: {
    meters: number
  }
}
interface RocketResponse {
  rocket: Rocket
}

interface RocketProps {
  rocket: Rocket
  onBack?: () => void
}
const RocketCard: React.FC<RocketProps> = ({rocket, onBack}) => (
  <Card>
    <CardHeader
      title={<Typography variant="h5" component="div">{rocket.name}</Typography>}
      subheader={<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{rocket.active ? 'active' : 'inactive'}</Typography>}
      avatar={<IconButton><ArrowBackIcon onClick={onBack} /></IconButton>}
      sx={{
        pb: 0
      }}
    />
    <CardContent sx={{pt: 0}}>
      <Typography sx={{ mb: 0 }} color="text.secondary" fontSize={12}>stages: {rocket.stages}</Typography>
      <Typography sx={{ mb: 0 }} color="text.secondary" fontSize={12}>height: {rocket.height.meters}m</Typography>
      <Typography sx={{ mb: 1.25 }} color="text.secondary" fontSize={12}>diameter: {rocket.diameter.meters}m</Typography>
      <Typography variant="body2">
        {rocket.description} <a href={rocket.wikipedia} target="_blank">Wikipedia</a>
      </Typography>
    </CardContent>
  </Card>
)

const RocketPage: React.FC = () => {
  const [fetch, {loading, error, data}] = useLazyQuery<RocketResponse>(rocketQuery)
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }
    fetch({
      variables: {
        id
      }
    })
  }, [id])
  return (
    <Box sx={{
      display: 'flex',
      minHeight: (theme) => `calc(100vh-${theme.spacing(6)}px)`,
      justifyContent: 'center',
      alignItems: loading || error ? 'center' : 'unset',
    }}>
      {loading && (
        <Shake>
          <RocketLaunchIcon fontSize='large' />
        </Shake>
      )}
      {error && <Box color="error">Okay, Houston... we've had a problem here.</Box>}
      {data?.rocket && (
        <SlideDown>
          <RocketCard rocket={data.rocket} onBack={() => navigate('/')} />
        </SlideDown>
      )}
    </Box>
  )
}

export default RocketPage