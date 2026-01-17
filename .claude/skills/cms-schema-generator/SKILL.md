# CMS Schema Generator

## Purpose
Automatically generate Webflow CMS collection schemas from mock data files.

## Input Analysis

### 1. Read Mock Data Structure
````javascript
// Example input: mockBlogData.js
export const blogPost = {
  title: "My First Post",
  slug: "my-first-post",
  author: {
    name: "John Doe",
    avatar: "/john.jpg"
  },
  categories: ["Tech", "Webflow"],
  body: "<p>Content here...</p>",
  publishedDate: "2026-01-15",
  featured: true,
  viewCount: 1234
};
````

### 2. Infer Structure
````yaml
collections:
  - name: Blog Posts
    fields:
      - title (PlainText)
      - slug (PlainText, unique)
      - body (RichText)  # HTML detected
      - publishedDate (Date)  # Date format detected
      - featured (Bool)
      - viewCount (Number)
      - author (Reference → Authors)
      - categories (MultiReference → Categories)
````

## Type Inference Rules

### Strings
````javascript
"Short text" → PlainText (< 100 chars, no HTML)
"<p>HTML content</p>" → RichText (contains HTML tags)
"/path/to/page" → Link (starts with / or http)
"/image.jpg" → Image (ends with image extension)
"2026-01-15" → Date (matches YYYY-MM-DD)
"Long text exceeding one hundred characters..." → RichText
````

### Numbers
````javascript
42 → Number
3.14 → Number (Webflow supports decimals)
````

### Booleans
````javascript
true/false → Bool
````

### Arrays
````javascript
["string1", "string2"] → MultiReference to new collection
[{object1}, {object2}] → MultiReference to new collection (create from objects)
````

### Objects
````javascript
{ nested: "object" } → Reference to new collection
````

## Collection Naming

### From Variable Names
````javascript
// Input
const blogPost = {...};

// Output
Collection: "Blog Posts" (pluralize, add space)
Singular: "Blog Post"
Slug: "blog-posts"
````

### From Arrays
````javascript
// Input
const posts = [{...}, {...}];

// Output
Collection: "Posts"
Singular: "Post"
````

## Field Naming

### From Object Keys
````javascript
// Input
{
  title: "...",
  publishedDate: "...",
  authorName: "..."
}

// Output
Fields:
- Title (camelCase → Title Case)
- Published Date (split camelCase)
- Author Name
````

## Required Field Detection

Mark as required if:
- Named: `title`, `name`, `slug`
- Used as identifier
- Always present in all sample data

## Default Value Detection
````javascript
{
  status: "draft",  // If same in all samples → default: "draft"
  published: false  // If same → default: false
}
````

## Validation Rules

### Unique Fields
- `slug` → Always unique
- Fields ending in `Id` → Unique

### Max Length
````javascript
title: "Short title" → maxLength: 100
description: "Longer description..." → maxLength: 500
````

## Output Format
````yaml
# Auto-generated CMS Schema
# Source: prototype/src/data/mockBlogData.js
# Generated: 2026-01-17

collections:
  - name: Blog Posts
    slug: blog-posts
    singularName: Blog Post
    
    fields:
      - name: Title
        slug: title
        type: PlainText
        required: true
        validation:
          maxLength: 100
      
      - name: Slug
        slug: slug
        type: PlainText
        required: true
        unique: true
        helpText: "URL-friendly version of title"
      
      - name: Body
        slug: body
        type: RichText
        required: true
      
      - name: Published Date
        slug: published-date
        type: Date
        required: false
        default: "current_date"
      
      - name: Featured
        slug: featured
        type: Bool
        required: false
        default: false
      
      - name: View Count
        slug: view-count
        type: Number
        required: false
        default: 0
      
      - name: Author
        slug: author
        type: Reference
        collection: authors
        required: true
      
      - name: Categories
        slug: categories
        type: MultiReference
        collection: categories
        required: false

  # Referenced collections
  - name: Authors
    slug: authors
    singularName: Author
    fields:
      - name: Name
        slug: name
        type: PlainText
        required: true
      - name: Avatar
        slug: avatar
        type: Image

  - name: Categories
    slug: categories
    singularName: Category
    fields:
      - name: Name
        slug: name
        type: PlainText
        required: true
````