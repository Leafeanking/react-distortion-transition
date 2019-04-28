import React from 'react'
import displacementUri from '../../static/triangles.jpg'
import * as PIXI from 'pixi.js'
import styled from 'styled-components'
import { Stage, Sprite } from '@inlet/react-pixi'
import { TweenMax } from "gsap/TweenMax";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

const StyledStage = styled(Stage)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 1.25s .25s linear;

  opacity: ${props => props.active ? '1' : '0'};
`

const Image = styled.img`
  opacity: 0;
  visibility: 0;
`

class FilterTransition extends React.Component {
  constructor(props) {
    super(props)

    this.defaultElm = React.createRef()

    const displacementSprite = new PIXI.Sprite.fromImage(displacementUri)
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
    displacementFilter.scale = { x: 0, y: 0 }
    this.state = {
      displacementFilter: displacementFilter,
      displacementSprite,
    }
  }


  shouldComponentUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      const filter = this.state.displacementFilter

      TweenMax.to(
        filter.scale, .75,
        {
          x: 50,
          y: 50,
          onComplete: () => (TweenMax.to(filter.scale, .75, { x: 0, y: 0 }))
        }
      )
    }
    return true
  }

  render() {
    const {
      defaultElement,
      secondaryElement,
      active,
      className,
    } = this.props;
    return (
      <Wrapper>
        <Image src={secondaryElement} />
        <StyledStage active={!active}>
          <Sprite
            ref={this.defaultElm}
            filters={[this.state.displacementFilter]}
            image={defaultElement}
            scale={2.5}
            anchor={0}
          />

        </StyledStage>

        <StyledStage active={active}>
          <Sprite
            className='test'
            ref={this.defaultElm}
            filters={[this.state.displacementFilter]}
            texture={PIXI.Texture.fromImage(secondaryElement)}
            scale={2.5}
            anchor={0}
          />
        </StyledStage>
      </Wrapper>
    )
  }
}

export default FilterTransition