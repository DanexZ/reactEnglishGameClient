import { prepareText } from "../prepareText";

test('testing prepareText', () => {

    const txt = "Hey! What's up?";
    const preparedText = prepareText(txt);
    expect(preparedText).toBe("Hey!+ What's up?");
  
});

test('testing prepareText', () => {

    const txt = "word";
    const preparedText = prepareText(txt);
    expect(preparedText).toBe("word");
  
});