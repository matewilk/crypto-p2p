import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { MessageForm } from "./MessageForm";

describe("MessageForm", () => {
  const sendMock = jest.fn();
  beforeEach(() => {
    render(<MessageForm send={sendMock} />);
  });

  it("has send button disabled when message is empty", () => {
    const sendButton = screen.getByRole("button", { name: /send/i });

    expect(sendButton).toBeDisabled();
  });

  it("has send button enabled when message is not empty", async () => {
    const messageInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /message/i,
    });
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.input(messageInput, { target: { value: "test message" } });

    await waitFor(() => {
      expect(messageInput.value).toBe("test message");
      expect(sendButton).toBeEnabled();
    });
  });

  it("sends a message successfully", async () => {
    const messageInput = screen.getByRole("textbox", { name: /message/i });
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(messageInput, { target: { value: "test message" } });
    fireEvent.submit(sendButton);

    await waitFor(() => {
      expect(sendMock).toHaveBeenCalled();
    });
  });
});