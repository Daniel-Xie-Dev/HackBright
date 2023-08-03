import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class BalancedBracketTest {

    @Test
    public void testBalancedBrackets_balancedParens() {
        assertTrue(DataStructures.balancedBrackets("()"));
    }

    @Test
    public void testBalancedBrackets_tooManyOpenParens() {
        assertFalse(DataStructures.balancedBrackets("({)"));
    }

    @Test
    public void testBalancedBrackets_tooManyClosedParens() {
        assertFalse(DataStructures.balancedBrackets("({})>"));
    }

    @Test
    public void testBalancedBrackets_startWithClosedParens() {
        assertFalse(DataStructures.balancedBrackets(")("));
    }

    @Test
    public void testBalancedBrackets_emptyString() {
        assertTrue(DataStructures.balancedBrackets(""));
    }

    @Test
    public void testBalancedBrackets_balancedComboBrackets() {
        assertTrue(DataStructures.balancedBrackets("<({})>"));
    }

    @Test
    public void testBalancedBrackets_mismatchedBrackets() {
        assertFalse(DataStructures.balancedBrackets("<({)}>"));
    }

}