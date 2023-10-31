export const codeExamples: { [key: string]: string } = {
  javascript: `
    console.log('Hello, World!');
        `,
  cpp: `
    #include <iostream>
    int main() {
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }
        `,
  java: `
    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
        `,
  go: `
    package main
    import "fmt"
    func main() {
        fmt.Println("Hello, World!")
    }
        `,
  python: `
    print("Hello, World!")
        `,
  kotlin: `
    fun main() {
        println("Hello, World!")
    }
        `,
  c: `
    #include <stdio.h>
    int main() {
        printf("Hello, World!\n");
        return 0;
    }
        `,
};
