# Component Simplification for Webflow

## Purpose
Simplify complex React patterns into Webflow-friendly structures.

## Simplification Rules

### 1. State Management → Remove
````jsx
// Complex (Don't use)
const [items, setItems] = useState([]);
const { data, loading } = useQuery(GET_ITEMS);

useEffect(() => {
  if (data) setItems(data.items);
}, [data]);

// Simple (Webflow-friendly)
const items = mockItems; // Static data = CMS content
````

### 2. Hooks → Remove
````jsx
// Complex
const value = useMemo(() => expensiveCalc(data), [data]);
const debouncedSearch = useDebounce(searchTerm, 300);

// Simple
const value = data.calculatedValue; // Pre-calculated in mock data
const searchTerm = ""; // Static for prototype
````

### 3. Context → Props
````jsx
// Complex
const theme = useContext(ThemeContext);
const user = useContext(UserContext);

// Simple
function Component({ theme, user }) {
  // Pass as props instead
}
````

### 4. Conditional Rendering → Simplified
````jsx
// Complex
{isLoading ? <Spinner /> : error ? <Error /> : data ? <Content /> : null}

// Simple
{data && <Content />}
// Handle loading/error states in Webflow with conditional visibility
````

### 5. Computed Values → Pre-compute
````jsx
// Complex
const filteredItems = items
  .filter(item => item.category === selectedCategory)
  .map(item => ({ ...item, discount: item.price * 0.1 }))
  .sort((a, b) => b.rating - a.rating);

// Simple
const filteredItems = mockFilteredItems; // Pre-computed in mock data
````

## Before/After Examples

### Before: Complex Form
````jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data) => {
    await fetch('/api/login', { method: 'POST', body: JSON.stringify(data) });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
}
````

### After: Webflow-Simple Form
````jsx
function LoginForm({ onSubmit }) {
  // WEBFLOW TRANSLATION:
  // - Use native Webflow form element
  // - Add custom validation via embed if needed
  // - See: webflow-embeds/interactions/form-validation.js
  
  return (
    <form
      className="login-form"
      data-webflow-element="Form"
      onSubmit={onSubmit}
    >
      <input
        type="email"
        name="email"
        className="form__input"
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        name="password"
        className="form__input"
        placeholder="Password"
        required
      />
      
      <button
        type="submit"
        className="btn btn--primary"
      >
        Login
      </button>
    </form>
  );
}
````

## Maximum Complexity Allowed

For Webflow translation, components should not exceed:
- **3 levels of nesting** (section → container → content)
- **0 hooks** (except basic useState for prototype demos)
- **0 external state management** (no Redux, Zustand, etc.)
- **0 API calls** (use mock data)
- **1 conditional render per component** (keep it simple)

If component exceeds these limits:
1. Break into smaller components
2. Remove unnecessary abstractions
3. Flatten the structure