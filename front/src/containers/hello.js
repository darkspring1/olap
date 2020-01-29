import { connect } from 'react-redux'
import { addRow } from '../actions'
import Hello from '../components/hello'


const getName = name => { 
  return { name: name || 'egor' }
}

const mapStateToProps = state => ({
  person: getName(state.text)
})
const mapDispatchToProps = dispatch => ({
  incCounter: text => dispatch(addRow(text))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)