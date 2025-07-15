const validOperations = new Set<string>(); 
  validOperations.add("+");
  validOperations.add("-"); 
  validOperations.add("*"); 
  validOperations.add("/");

  const validDigits = new Set<string>();
  validDigits.add("1");
  validDigits.add("2"); 
  validDigits.add("3"); 
  validDigits.add("4");
  validDigits.add("5");
  validDigits.add("6"); 
  validDigits.add("7"); 
  validDigits.add("8");
  validDigits.add("9");
  validDigits.add("0");

const GenerateRandomDigit = () => {
    const isOperation = Math.random() < 0.25;

        if (isOperation) {
        const operationArray = Array.from(validOperations);
        const randomIndex = Math.floor(Math.random() * operationArray.length);
        return operationArray[randomIndex];
        } else {
        const digitArray = Array.from(validDigits);
        const randomIndex = Math.floor(Math.random() * digitArray.length);
        return digitArray[randomIndex];
        }
}

const IsOperationValid = (operation: string) => {
    return validOperations.has(operation);
}

const IsDigitValid = (digit: string) => {
    return validDigits.has(digit);
}

export { GenerateRandomDigit, IsOperationValid, IsDigitValid }