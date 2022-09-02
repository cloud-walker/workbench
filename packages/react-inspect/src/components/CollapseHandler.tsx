import {Component, ReactElement} from 'react'

export class CollapseHandler extends Component<{
  children: (show: boolean) => ReactElement
}> {
  static displayName = 'ReactInspectCollapseHandler'

  state = {show: false}

  render() {
    return (
      <span
        onClick={e => {
          e.stopPropagation()
          this.setState({show: !this.state.show})
        }}
        style={{cursor: 'pointer'}}
      >
        {this.props.children(this.state.show)}
      </span>
    )
  }
}
