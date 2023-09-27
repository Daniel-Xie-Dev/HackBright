public class KPalindrome {

    /*
     * The Levenshtein distance (Edit distance) Problem
     * 
     * Write an efficient algorithm to check if a given string is k–palindrome or
     * not. A string is k–palindrome if it becomes a palindrome on removing at most
     * k characters from it.
     * 
     * For example,
     * 
     * Input: ABCDBA, k = 1
     * Output: k–palindrome
     * Explanation: The string becomes a palindrome by removing either C or D from
     * it.
     * 
     * Input: ABCDECA, k = 1
     * Output: Not a k–palindrome
     * Explanation: The string needs at least 2–removals from it to become a
     * palindrome.
     * 
     * Is empty string a palindrome?
     * Input AB -> A
     * So, any string with length = n is at least a (n-1)-palindrome
     * 
     * 
     * ABCDABC
     * // String s = "RADASR"; int k = 1; //true
     * // String s1 = "RAADAR"; int k = 2; //true
     * // String s2 = "RADDELETEAR"; int k = 6; //true
     */

    public static void main(String[] args) {
        System.out.println(isValidKPalindrome("ABCDBA", 1));
        System.out.println(isValidKPalindrome("ABCDECA", 1));
        System.out.println(isValidKPalindrome("", 1));
        System.out.println(isValidKPalindrome("A", 1));
        System.out.println(isValidKPalindrome("RADASR", 1));
        System.out.println(isValidKPalindrome("RAADADR", 1));
        System.out.println(isValidKPalindrome("RADDELETEAR", 6));

    }

    public static boolean isValidKPalindrome(String input, int k) {
        return helper(input, k, 0, input.length() - 1);
    }

    public static boolean helper(String input, int k, int left, int right) {
        if (left >= right)
            return true;

        if (input.charAt(left) == input.charAt(right)) {
            return helper(input, k, left + 1, right - 1);
        }

        if (input.charAt(left) != input.charAt(right)) {
            if (k <= 0)
                return false;
            return helper(input, k - 1, left + 1, right) || helper(input, k - 1, left, right - 1);
        }

        return true;

    }
}