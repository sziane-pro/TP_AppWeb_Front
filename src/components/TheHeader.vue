<script>
export default {
  name: 'TheHeader',
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <h1>Ma Boutique</h1>
        </router-link>
      </div>

      <nav class="navigation">
        <ul class="nav-links">
          <li>
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>
          <li>
            <router-link to="/products" class="nav-link">Produits</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-link {
  text-decoration: none;
  color: #333;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
}

.navigation {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  text-decoration: underline;
  text-decoration-color: #42b983;
  text-underline-offset: 4px;
}

.nav-link.router-link-active {
  color: #42b983;
}

/* Responsive design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 15px 20px;
  }

  .logo {
    margin-bottom: 15px;
  }

  .navigation {
    width: 100%;
    justify-content: center;
  }

  .nav-links {
    width: 100%;
    justify-content: space-around;
  }
}
</style>
