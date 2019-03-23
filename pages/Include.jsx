import React from "react";

class Include extends React.Component {
  state = {};
  render() {
    const { loaded = false } = this.state;
    return (
      <React.Fragment>
        {loaded ? (
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossOrigin="anonymous"
          />
        ) : null}
        {this.props.children}
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
  }
}

export default Include;
