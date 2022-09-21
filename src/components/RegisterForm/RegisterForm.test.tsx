import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./RegisterForm";

test("", () => {

    render(<RegisterForm />)

    const element = screen.getByTestId('input-userName');

    userEvent.type(element, "dracula$");

    screen.getAllByRole("");
    

});