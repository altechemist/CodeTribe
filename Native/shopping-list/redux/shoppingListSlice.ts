import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface ShoppingListItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  completed: boolean;
}

interface ShoppingListsState {
  [email: string]: {
    [listName: string]: ShoppingListItem[];
  };
}

interface AddItemPayload {
  email: string;
  listName: string;
  item: ShoppingListItem;
}

interface DeleteItemPayload {
  email: string;
  listName: string;
  itemId: string;
}

interface UpdateItemPayload {
  email: string;
  listName: string;
  item: ShoppingListItem;
}

interface CheckoutPayload {
  email: string;
  listName: string;
  itemId: string;
}

interface AddListPayload {
  email: string;
  listName: string;
}

interface RemoveListPayload {
  email: string;
  listName: string;
}

const initialState: ShoppingListsState = {
  // Format: userEmail: { listName: [shoppingListItems] }
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setShoppingLists: (state, action: PayloadAction<{ email: string; shoppingLists: ShoppingListsState }>) => {
      const { email, shoppingLists } = action.payload;
      state[email] = shoppingLists[email];
    },

    addItemToList: (state, action: PayloadAction<AddItemPayload>) => {
      const { email, listName, item } = action.payload;
      state[email] = state[email] || {};
      state[email][listName] = state[email][listName] || [];
      state[email][listName].push(item);
      updateLocalStorage(email, state[email]);
    },

    deleteItemFromList: (state, action: PayloadAction<DeleteItemPayload>) => {
      const { email, listName, itemId } = action.payload;
      if (state[email] && state[email][listName]) {
        state[email][listName] = state[email][listName].filter(item => item.id !== itemId);
        updateLocalStorage(email, state[email]);
      }
    },

    toggleItemCompletion: (state, action: PayloadAction<CheckoutPayload>) => {
      const { email, listName, itemId } = action.payload;
      const item = state[email]?.[listName]?.find(item => item.id === itemId);
      if (item) {
        item.completed = !item.completed;
        updateLocalStorage(email, state[email]);
      }
    },

    updateItemInList: (state, action: PayloadAction<UpdateItemPayload>) => {
      const { email, listName, item } = action.payload;
      const itemIndex = state[email]?.[listName]?.findIndex(existingItem => existingItem.id === item.id);
      if (itemIndex !== -1) {
        state[email][listName][itemIndex] = { ...state[email][listName][itemIndex], ...item };
        updateLocalStorage(email, state[email]);
      }
    },

    addListForUser: (state, action: PayloadAction<AddListPayload>) => {
      const { email, listName } = action.payload;
      state[email] = state[email] || {};
      state[email][listName] = [];
      updateLocalStorage(email, state[email]);
    },

    removeListForUser: (state, action: PayloadAction<RemoveListPayload>) => {
      const { email, listName } = action.payload;
      if (state[email] && state[email][listName]) {
        delete state[email][listName];
        updateLocalStorage(email, state[email]);
      }
    },
  },
});

// Helper function to update localStorage (same as before)
const updateLocalStorage = (email: string, shoppingLists: { [listName: string]: ShoppingListItem[] }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user: { email: string }) => user.email === email);

  if (userIndex !== -1) {
    users[userIndex].lists = shoppingLists;
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// Export actions and reducer
export const {
  setShoppingLists,
  addItemToList,
  deleteItemFromList,
  toggleItemCompletion,
  updateItemInList,
  addListForUser,
  removeListForUser,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
