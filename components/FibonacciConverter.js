'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FibonacciConverter = () => {
  const [n, setN] = useState(10);
  const [algorithm, setAlgorithm] = useState('iterative');
  const [result, setResult] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);

  const fibRecursive = (num) => {
    if (num <= 1) return num;
    return fibRecursive(num - 1) + fibRecursive(num - 2);
  };

  const fibIterative = (num) => {
    if (num <= 1) return num;
    let a = 0, b = 1;
    for (let i = 2; i <= num; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  };

  const calculateFib = () => {
    const startTime = performance.now();
    const res = algorithm === 'recursive' ? fibRecursive(n) : fibIterative(n);
    const endTime = performance.now();
    setResult(res);
    setExecutionTime(endTime - startTime);
  };

  const recursiveCode = `// Naive Recursive (Exponential Time, O(2^n))\nlong long fib_recursive(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fib_recursive(n - 1) + fib_recursive(n - 2);\n}`;

  const iterativeCode = `// Iterative (Linear Time, O(n), O(1) Space)\nlong long fib_iterative(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    long long a = 0, b = 1;\n    for (int i = 2; i <= n; ++i) {\n        long long temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}`;

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Fibonacci Calculator</CardTitle>
                <CardDescription>Select an algorithm and a number to see the result and execution time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Input type="number" value={n} onChange={(e) => setN(parseInt(e.target.value))} placeholder="Enter n" className="w-24" />
                    <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="iterative">Iterative</SelectItem>
                            <SelectItem value="recursive">Recursive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={calculateFib}>Calculate</Button>
                </div>
                {result !== null && (
                    <div>
                        <p>Result: {result}</p>
                        <p>Execution Time: {executionTime?.toFixed(4)} ms</p>
                    </div>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Assembly-Level Proof</CardTitle>
                <CardDescription>A comparison of the generated x86-64 assembly from a standard C++ compiler (like GCC or Clang on Godbolt).</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Naive Recursive C++</h3>
                    <pre className="bg-slate-100 p-4 rounded-md text-sm whitespace-pre-wrap"><code>{recursiveCode}</code></pre>
                    <div className="mt-4 text-sm">
                        <p className="font-semibold">Assembly Analysis:</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                            <li>Generates two recursive `call fib_recursive` instructions inside the function body.</li>
                            <li>Each call pushes a return address onto the stack, leading to a stack depth proportional to `n`.</li>
                            <li>For large `n`, this will inevitably lead to a `stack overflow` and is highly inefficient due to recomputing the same values many times.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">O(1)-Space Iterative C++</h3>
                    <pre className="bg-slate-100 p-4 rounded-md text-sm whitespace-pre-wrap"><code>{iterativeCode}</code></pre>
                    <div className="mt-4 text-sm">
                        <p className="font-semibold">Assembly Analysis:</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                            <li>The core logic is a simple loop (`.L3` in a typical assembly output).</li>
                            <li>It uses registers for variables `a` and `b`, performing additions and moves.</li>
                            <li>Contains `jmp` (jump) instructions to loop, but no recursive `call` instructions.</li>
                            <li>Stack usage is constant (O(1)), making it efficient and safe for very large `n`.</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default FibonacciConverter;