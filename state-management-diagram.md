# State Management Diagram

```mermaid
graph TD
    subgraph Local_State
        A1[useState in Components]
        A2[useReducer in Forms/Async]
    end
    subgraph Global_State
        B1[UserContext]
        B2[FoodContext]
        B3[ThemeContext]
        B4[EmojiContext]
    end
    subgraph Persistence
        C1[localStorage: Favorites]
        C2[localStorage: Cart]
        C3[localStorage: Ratings]
    end
    subgraph Custom_Hooks
        D1[useBitcoinPrice]
        D2[useBitcoinPriceWithReducer]
    end
    subgraph Routing
        E1[React Router]
        E2[Dynamic Routes]
    end

    %% Local State
    A1 -->|UI State| F1[Component UI]
    A2 -->|Form State| F2[AddCatForm, BitcoinRates]

    %% Global State
    B1 -->|currentUser| F3[Login, Register, Profile]
    B2 -->|favorites| F4[FoodCard, Favorites Page]
    B3 -->|theme| F5[App, Theme Toggle]
    B4 -->|emoji| F6[Emoji Component]

    %% Persistence
    B2 --> C1
    F4 --> C1
    C1 -->|sync| B2
    C2 -->|Cart| F7[Cart/Checkout]
    C3 -->|Ratings| F8[Menu/Stars]

    %% Custom Hooks
    D1 -->|Bitcoin Price| F9[BitcoinRates]
    D2 -->|Bitcoin Price (Reducer)| F9

    %% Routing
    E1 -->|Navigation| F10[AppRoutes, Navbar]
    E2 -->|Dynamic Params| F11[CatDetail, UserProfile]

    %% Error/Loading State
    F2 -->|error/loading| F12[UI Feedback]
    F9 -->|error/loading| F12
    F3 -->|error/loading| F12
```

---
**Legend:**
- **Local State:** useState/useReducer for component-level state
- **Global State:** Contexts for app-wide state
- **Persistence:** localStorage for favorites, cart, ratings
- **Custom Hooks:** For async/complex state
- **Routing:** React Router for navigation and dynamic routes
- **Error/Loading:** State for feedback and validation
