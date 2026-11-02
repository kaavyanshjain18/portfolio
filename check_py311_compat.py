#!/usr/bin/env python3
import json
import sys
import urllib.error
import urllib.request
from packaging.specifiers import SpecifierSet
from packaging.version import Version

TARGET = "3.11"


def fetch_release(name, version):
    """Return the release JSON or None if the package/version is missing on PyPI."""
    url = f"https://pypi.org/pypi/{name}/{version}/json"
    try:
        with urllib.request.urlopen(url, timeout=15) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            return None
        raise


def min_python(spec):
    """Return the highest lower bound in requires_python, such as >=3.9 -> 3.9."""
    bounds = [Version(part.version) for part in spec if part.operator in (">=", ">", "==", "~=")]
    return max(bounds) if bounds else None


def parse_line(line):
    text = line.strip()
    if not text or text.startswith("#"):
        return None

    if "==" not in text:
        return None

    name, version = text.split("==", 1)
    return name.strip().lower(), version.strip()


def main(path):
    with open(path, encoding="utf-8") as handle:
        deps = [item for item in map(parse_line, handle) if item]

    not_found = 0
    incompatible = 0
    highest = None

    for name, version in deps:
        data = fetch_release(name, version)
        if data is None:
            not_found += 1
            continue

        requires_python = (data["info"].get("requires_python") or "").strip()
        if not requires_python:
            continue

        spec = SpecifierSet(requires_python)
        if not spec.contains(TARGET):
            incompatible += 1

        low = min_python(spec)
        if low is not None and (highest is None or low > highest[0]):
            highest = (low, f"{name}=={version}", f">={low}")

    print(f"Dependencies checked: {len(deps)}")
    print(f"Not found on PyPI: {not_found}")
    print(f"Incompatible with Python {TARGET}: {incompatible}")
    if highest:
        print(f"Highest requirement: {highest[1]} ({highest[2]})")
    else:
        print("Highest requirement: none")


if __name__ == "__main__":
    target_file = sys.argv[1] if len(sys.argv) > 1 else "requirements.txt"
    main(target_file)
