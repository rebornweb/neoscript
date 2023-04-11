using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace UnrealTest
{
    internal class ultclass
    {
        [TestFixture]
        public class MyTests
        {
            [Test]
            public void TestAddition()
            {
                int result = Calculator.Add(30, 3);
                Assert.AreEqual(33, result);
            }
        }

        public static class Calculator
        {
            public static int Add(int a, int b)
            {
                return a + b ;
            }
        }
    }
}
