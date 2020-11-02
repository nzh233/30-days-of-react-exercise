import React, {Component} from "react"

class Footer extends Component {
    render() {
      return (
        <footer style={this.props.footerTheme}>
          <div className='footer-wrapper'>
            <p>Copyright {this.props.date.getFullYear()}</p>
          </div>
        </footer>
      )
    }
}
export default Footer;