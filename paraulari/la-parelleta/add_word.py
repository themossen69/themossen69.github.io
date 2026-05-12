# Script per afegir paraules al joc de la parelleta de manera ràpida

import json
from datetime import datetime

def add_word(word: str, definition: str, date=None) -> dict:
    if date is None:
        date = datetime.now().strftime("%Y-%m-%d")

    with open("../words.json", "r", encoding="utf-8") as f:
        word_list = json.load(f)

        new_element= {
            "_id": len(word_list),
            "word": word,
            "definition": definition,
            "date": date
        }

    word_list.append(new_element)

    with open("../words.json", "w", encoding="utf-8") as f:
        json.dump(word_list, f, indent=4, ensure_ascii=False)

    return new_element

if __name__ == "__main__":
    print("Paraula:")
    word = input()

    print("Definició:")
    definition = input()

    print("Data (YYYY-MM-DD, opcional):")
    date = input()
    if date.strip() == "":
        date = None

    new_element = add_word(word, definition, date)
    
    print("Paraula afegida amb èxit!")
    print(new_element)
