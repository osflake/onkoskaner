import Dropdown from "react-bootstrap/Dropdown"
import "./CustomDropdown.css"

const CustomDropdown = () => {
  return (
    <Dropdown className="d-flex justify-content-between fs-13">
      <Dropdown.Toggle
        className="d-flex justify-content-between align-items-center custom-dropdown fs-13"
        variant="outline-primary"
        id="dropdown-basic"
      >
        asdsaddasd
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>1. asdasd</Dropdown.Item>
        <Dropdown.Item>1. asdasd</Dropdown.Item>
        <Dropdown.Item>1. asdasd</Dropdown.Item>
        <Dropdown.Item>1. asdasd</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CustomDropdown
