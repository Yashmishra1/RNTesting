import { fireEvent, render } from "@testing-library/react-native"
import CustomHeading from "../../../src/components/global/CustomHeading"
import { goBack } from "../../../src/utils/NavigationUtil"
//Mock the go back function
jest.mock('../../../src/utils/NavigationUtil', () => ({
    goBack: jest.fn()
}))
describe('Custom Heading', () => {
    it("Should render the title correctly", () => {
        const title = "Test Title"
        const {getByText}  = render(<CustomHeading title={title} />)
        expect(getByText(title)).toBeTruthy()
    })
    it('Should call goback when back button is pressed', () => {
         const {getByTestId} = render(<CustomHeading title="jest" />)
         const backButton = getByTestId("back-button")
         fireEvent.press(backButton)
         expect(goBack).toHaveBeenCalled()
    })
})