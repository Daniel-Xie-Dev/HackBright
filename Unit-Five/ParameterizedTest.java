import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class ParameterizedTest {

    private String input;
    private boolean expectedOutput;

    public ParameterizedTest(String input, boolean expectedOutput) {
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    @Parameters
    public static Collection<Object[]> testConditions() {
        String balancedParens = "()";
        String balancedAngleBrackets = "<<>>";
        String balancedComboBrackets = "<({})>";
        String emptyString = "";
        String tooManyOpenParens = "((";
        String tooManyOpenParens1 = "()(";
        String tooManyClosedParens = "())";
        String startClosedParens = ")(";
        String mismatchedBrackets = "<({)}>";
        String balancedBrackets = "<<>(({()(<><<>>)}))>";
        String singleBracket = "(";

        Object[][] expectedOutputs = {
                { balancedParens, true },
                { balancedAngleBrackets, true },
                { balancedComboBrackets, true },
                { emptyString, true },
                { tooManyOpenParens, false },
                { tooManyOpenParens1, false },
                { tooManyClosedParens, false },
                { startClosedParens, false },
                { mismatchedBrackets, false },
                { balancedBrackets, true },
                { singleBracket, false }
        };

        return Arrays.asList(expectedOutputs);

    }

    @Test
    public void testBalancedBrackets() {
        assertEquals(expectedOutput, DataStructures.balancedBrackets(input));
    }
}