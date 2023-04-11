def count_words(input_string):
    # Split the string into a list of words
    words_list = input_string.split()

    # Count the number of words in the list
    num_words = len(words_list)

    # Return the number of words
    return num_words

# Ask the user to enter a string
input_string = input("Enter a string: ")

# Call the function and print the result
num_words = count_words(input_string)
print("The number of words in the string is:", num_words)