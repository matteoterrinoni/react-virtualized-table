import Sidebar from './'

export const sidebar = (d: Sidebar) => {
  const p = d.props
  const s = d.state

  return {
    setContainer: e => {
      d.container = e
      d.setState({ container: e })
    },

    showTable: () => s.container
  }
}
