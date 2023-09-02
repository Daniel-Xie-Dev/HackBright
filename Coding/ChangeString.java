public class ChangeString {
    

    public static void main(String[] args) {
        System.out.println(removeVowelAndSpacesAddCipher("Hola mi 76 amigos"));
    }


    public static String removeVowelAndSpacesAddCipher(String input){
        input = String.join("", input.split(" "));
        StringBuilder noVowelSpaceString = new StringBuilder();

        for(int i = 0; i < input.length(); i++){
            char c = input.charAt(i);
            char temp = Character.toLowerCase(c);
            if(temp == 'a' || temp == 'e' || temp == 'i' || temp =='o' || temp == 'u'){
                continue;
            }
            noVowelSpaceString.append(c);
        }

        StringBuilder result = new StringBuilder();

        int number = 0;
        for(int i = 0; i < noVowelSpaceString.length(); i++){
            char currentChar = noVowelSpaceString.charAt(i);
            if(currentChar <= '9' && currentChar >= '0'){
                number += currentChar - '0';
                continue;
            }

            if(number != 0){
                boolean isUpperCase = Character.isUpperCase(currentChar);

                currentChar -= isUpperCase ? 'A' : 'a';
                currentChar += number % 26;
                currentChar += isUpperCase ? 'A' : 'a';
                number = 0;
            }
            result.append(currentChar);

        }
        



        return result.toString();

    }
}
