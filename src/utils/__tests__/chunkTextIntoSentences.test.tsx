import { chunkTextIntoSentences } from "../chunkTextIntoSentences";

test('testing chunkTextIntoSentences', () => {
    
    const txt = "Hey! What's up? J'm good...";
    const preparedText = chunkTextIntoSentences(txt);
    expect(preparedText).toStrictEqual([
        "Hey!",
        " What's up?",
        " J'm good..."
    ]);
  
});

test('testing chunkTextIntoSentences', () => {
    
    const txt = "Hey... You're alright?";
    const preparedText = chunkTextIntoSentences(txt);
    expect(preparedText).toStrictEqual([
        "Hey...",
        " You're alright?"
    ]);
  
});

test('testing chunkTextIntoSentences', () => {
    
    const txt = "word";
    const preparedText = chunkTextIntoSentences(txt);
    expect(preparedText).toStrictEqual([
        "word"
    ]);
  
});