import Button, { ButtonProps } from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import React, { PureComponent } from "react"
import styled from "styled-components"

import CameraManager, {
  CameraLocationOptions,
} from "../../managers/CameraManager"
import PlayerManager from "../../managers/models/PlayerManager"
import SceneManager from "../../managers/SceneManager"

interface Props {}

class PlayerCameraControls extends PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  onPlayerClick = (playerName: string) => {
    return () => CameraManager.getInstance().setCameraLocation({ playerName })
  }

  onFieldClick = (fieldLocation: CameraLocationOptions["fieldLocation"]) => {
    return () =>
      CameraManager.getInstance().setCameraLocation({ fieldLocation })
  }

  renderPlayerButtons() {
    const { players } = SceneManager.getInstance()
    const renderTeam = (team: PlayerManager[]) =>
      team.map(({ playerName }) => {
        return (
          <PlayerButton
            key={playerName}
            variant="outlined"
            onClick={this.onPlayerClick(playerName)}
          >
            {playerName}
          </PlayerButton>
        )
      })
    return (
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item>
          {renderTeam(players.filter(player => player.isOrangeTeam))}
        </Grid>
        <Grid item>
          {renderTeam(players.filter(player => !player.isOrangeTeam))}
        </Grid>
      </Grid>
    )
  }

  render() {
    return <div>{this.renderPlayerButtons()}</div>
  }
}

const PlayerButton = styled(Button)`
  && {
    margin: 6px;
  }
` as React.ComponentType<ButtonProps>

export default PlayerCameraControls
