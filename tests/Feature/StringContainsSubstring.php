<?php

namespace Tests\Feature;


use PHPUnit\Framework\Constraint\Constraint;

class StringContainsSubstring extends Constraint
{
    private $substring;

    public function __construct(string $substring)
    {
        $this->substring = $substring;
    }

    protected function matches($other): bool
    {
        return strpos($other, $this->substring) !== false;
    }

    protected function failureDescription($other): string
    {
        return "'$other' contains the substring '{$this->substring}'";
    }

    public function toString(): string
    {
        return 'contains the substring "' . $this->substring . '"';
    }
}
